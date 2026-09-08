#!/usr/bin/env bash
set -euo pipefail

adb wait-for-device

package_ready=0
for attempt in $(seq 1 24); do
  if adb shell cmd package list packages >/dev/null 2>&1; then
    package_ready=1
    break
  fi
  sleep 5
done
if [[ "$package_ready" -ne 1 ]]; then
  echo "Android package manager did not become ready." >&2
  exit 1
fi

installed=0
for attempt in $(seq 1 6); do
  if adb install -r android/app/build/outputs/apk/debug/app-debug.apk; then
    installed=1
    break
  fi
  adb kill-server || true
  adb start-server
  adb wait-for-device
  sleep 10
done
if [[ "$installed" -ne 1 ]]; then
  echo "PocketFlow APK could not be installed." >&2
  exit 1
fi

adb reverse tcp:8081 tcp:8081

CI=1 npx expo start --localhost > /tmp/pocketflow-metro.log 2>&1 &
METRO_PID=$!
cleanup() {
  kill "$METRO_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

metro_ready=0
for attempt in $(seq 1 45); do
  if curl -fsS http://127.0.0.1:8081/status 2>/dev/null | grep -q 'packager-status:running'; then
    metro_ready=1
    break
  fi
  sleep 2
done
if [[ "$metro_ready" -ne 1 ]]; then
  cat /tmp/pocketflow-metro.log || true
  exit 1
fi

mkdir -p docs/screenshots

capture() {
  local path="$1"
  sleep "${2:-5}"
  adb exec-out screencap -p > "$path"
  test -s "$path"
}

adb shell am force-stop dev.kamilla.pocketflow || true
adb shell monkey -p dev.kamilla.pocketflow -c android.intent.category.LAUNCHER 1
capture docs/screenshots/overview.png 20

adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://payments' -p dev.kamilla.pocketflow
capture docs/screenshots/payment-schedule.png 7

adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://checklist' -p dev.kamilla.pocketflow
capture docs/screenshots/checklist.png 7

adb shell cmd uimode night yes
adb shell am force-stop dev.kamilla.pocketflow || true
adb shell monkey -p dev.kamilla.pocketflow -c android.intent.category.LAUNCHER 1
sleep 12
adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://settings' -p dev.kamilla.pocketflow
capture docs/screenshots/settings-dark.png 7

echo "Captured verified PocketFlow runtime screenshots:"
ls -lh docs/screenshots/*.png

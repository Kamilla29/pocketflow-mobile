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

APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
test -s "$APK_PATH"

installed=0
for attempt in $(seq 1 6); do
  if adb install -r "$APK_PATH"; then
    installed=1
    break
  fi
  adb kill-server || true
  adb start-server
  adb wait-for-device
  sleep 10
done
if [[ "$installed" -ne 1 ]]; then
  echo "PocketFlow release APK could not be installed." >&2
  exit 1
fi

mkdir -p docs/screenshots

capture() {
  local path="$1"
  sleep "${2:-6}"
  adb exec-out screencap -p > "$path"
  test -s "$path"
}

verify_app_running() {
  if ! adb shell pidof dev.kamilla.pocketflow >/dev/null 2>&1; then
    echo "PocketFlow is not running; recent Android logs:" >&2
    adb logcat -d -t 250 | tail -250 >&2 || true
    exit 1
  fi
}

adb shell am force-stop dev.kamilla.pocketflow || true
adb shell monkey -p dev.kamilla.pocketflow -c android.intent.category.LAUNCHER 1
sleep 15
verify_app_running
capture docs/screenshots/overview.png 5

adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://payments' -p dev.kamilla.pocketflow
capture docs/screenshots/payment-schedule.png 7
verify_app_running

adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://checklist' -p dev.kamilla.pocketflow
capture docs/screenshots/checklist.png 7
verify_app_running

adb shell am start -W -a android.intent.action.VIEW -d 'pocketflow://settings' -p dev.kamilla.pocketflow
capture docs/screenshots/settings.png 7
verify_app_running

echo "Captured verified PocketFlow release-runtime screenshots:"
ls -lh docs/screenshots/*.png

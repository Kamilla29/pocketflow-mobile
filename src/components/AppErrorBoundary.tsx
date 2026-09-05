import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { lightTheme } from '@app/theme/theme';

type Props = React.PropsWithChildren;
type State = { hasError: boolean };

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View accessibilityRole="alert" style={styles.card}>
          <Text style={styles.title}>PocketFlow hit an unexpected error</Text>
          <Text style={styles.body}>
            The demo can recover without losing any real user or financial information.
          </Text>
          <ActionButton label="Try again" onPress={this.reset} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: lightTheme.spacing.md,
    backgroundColor: lightTheme.colors.background
  },
  card: {
    gap: lightTheme.spacing.md,
    padding: lightTheme.spacing.lg,
    borderRadius: lightTheme.radius.md,
    backgroundColor: lightTheme.colors.surface
  },
  title: { color: lightTheme.colors.text, fontSize: 22, fontWeight: '800' },
  body: { color: lightTheme.colors.muted, lineHeight: 21 }
});

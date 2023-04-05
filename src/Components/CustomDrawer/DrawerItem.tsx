import * as React from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  PressableAndroidRippleConfig,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import color from 'color';
import { useInternalTheme } from 'react-native-paper/src/core/theming';
import type { ThemeProp } from 'react-native-paper/src/types';
import Icon, { IconSource } from 'react-native-paper/src/components/Icon';
import TouchableRipple from 'react-native-paper/src/components/TouchableRipple/TouchableRipple';
import Text from 'react-native-paper/src/components/Typography/Text';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * The label text of the item.
   */
  label: string;
  /**
   * Icon to display for the `DrawerItem`.
   */
  icon?: IconSource;
  /**
   * Whether to highlight the drawer item as active.
   */
  active?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Callback which returns a React element to display on the right side. For instance a Badge.
   */
  right?: (props: { color: string }) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/drawer-item.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *    <Drawer.Item
 *      style={{ backgroundColor: '#64ffda' }}
 *      icon="star"
 *      label="First Item"
 *    />
 * );
 *
 * export default MyComponent;
 * ```
 */
const DrawerItem = ({
  icon,
  label,
  active,
  theme: themeOverrides,
  style,
  onPress,
  accessibilityLabel,
  right,
  ...rest
}: Props) => {
  const theme = useInternalTheme(themeOverrides);
  const { roundness, isV3 } = theme;

  const backgroundColor = active
    ? isV3
      ? theme.colors.secondaryContainer
      : color(theme.colors.primary).alpha(0.12).rgb().string()
    : 'transparent';
  const contentColor = active
    ? isV3
      ? theme.colors.onSecondaryContainer
      : theme.colors.primary
    : isV3
    ? theme.colors.onSurfaceVariant
    : color(theme.colors.text).alpha(0.68).rgb().string();

  const labelMargin = icon ? (isV3 ? 12 : 32) : 0;
  const borderRadius = (isV3 ? 7 : 1) * roundness;
  const underlayColor = isV3
    ? color(backgroundColor)
        .mix(color(theme.colors.onSecondaryContainer), 0.16)
        .rgb()
        .toString()
    : undefined;
  const font = isV3 ? theme.fonts.labelLarge : theme.fonts.medium;

  return (
    <View {...rest}>
      <CustomPress
        borderless
        isOld={(Platform.Version as number) < 25}
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor, borderRadius },
          isV3 && styles.v3Container,
          style,
        ]}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={accessibilityLabel}
        underlayColor={underlayColor}
        theme={theme}
      >
        <View style={[styles.wrapper, isV3 && styles.v3Wrapper]}>
          <View style={styles.content}>
            {icon ? (
              <Icon source={icon} size={24} color={contentColor} />
            ) : null}
            <Text
              variant="labelLarge"
              selectable={false}
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: contentColor,
                  marginLeft: labelMargin,
                  ...font,
                },
              ]}
            >
              {label}
            </Text>
          </View>

          {right?.({ color: contentColor })}
        </View>
      </CustomPress>
    </View>
  );
};

const pressableRipple: PressableAndroidRippleConfig = { color: 'rgba(0, 0, 0, 0.3)', foreground: true }
const CustomPress = React.memo(function (props: any) {
  if (props.isOld) return(<Pressable {...props} android_ripple={pressableRipple} />);
  return(<TouchableRipple {...props} />);
});

DrawerItem.displayName = 'Drawer.Item';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    overflow: 'hidden'
  },
  v3Container: {
    justifyContent: 'center',
    height: 56,
    marginLeft: 12,
    marginRight: 12,
    marginVertical: 0,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  v3Wrapper: {
    marginLeft: 16,
    marginRight: 24,
    padding: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 32,
  },
});

export default DrawerItem;

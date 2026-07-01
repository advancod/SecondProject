const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // ethers' dependencies (@noble/curves, @noble/hashes) use subpath
    // `exports` maps that Metro's exports-aware resolver can't match
    // (no "react-native" condition); fall back to plain file resolution.
    unstable_enablePackageExports: false,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

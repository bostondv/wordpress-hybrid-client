let mod = angular.module('wordpress-hybrid-client.overwriteRun', []);

mod.run(($ionicPlatform, $window, $cordovaStatusbar, $ionicHistory) => {
    $ionicPlatform.ready(() => {
        // Make shrink view
        if ($window.Keyboard) {
            $window.Keyboard.shrinkView(true);
            $window.Keyboard.hideFormAccessoryBar(true);
            $window.Keyboard.disableScrollingInShrinkView(false);
        }
        
        if ($window.cordova && $window.cordova.plugins.Keyboard) {
            $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        // Style light statusbar
        if ($window.StatusBar) {
            $cordovaStatusbar.style(1);
        }
    });
});

export default mod = mod.name;

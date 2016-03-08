let mod = angular.module('wordpress-hybrid-client.overwriteRun', []);

mod.run(($ionicPlatform, $window, $cordovaStatusbar) => {
    $ionicPlatform.ready(() => {
        // Make shrink view
        if ($window.Keyboard) {
            $window.Keyboard.shrinkView(true);
        }
        // Style light statusbar
        if ($window.StatusBar) {
            $cordovaStatusbar.style(1);
        }
    });
});

export default mod = mod.name;

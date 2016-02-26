import modConfig from './config.js';
import modLoginController from './login.controller.js';
import modRegisterController from './register.controller.js';
import modLoginService from './login.service.js';
import modRegisterService from './register.service.js';

let mod = angular.module('wordpress-hybrid-client.auth', []);

mod.config(modConfig);
mod.controller('WPHCLoginController', modLoginController);
mod.controller('WPHCRegisterController', modRegisterController);
mod.service('$WPHCLogin', modLoginService);
mod.service('$WPHCRegister', modRegisterService);

export default mod = mod.name;

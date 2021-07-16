import Validators from "./Validators";
import MandatoryValidator from "./MandatoryValidator";
import RegexValidator from "./RegexValidator";

Validators.instance.registerValidator(new MandatoryValidator());
Validators.instance.registerValidator(new RegexValidator());
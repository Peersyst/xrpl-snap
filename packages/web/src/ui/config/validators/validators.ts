import { CreateConfig } from "@peersyst/react-components";
import XrplAddressValidator from "./XrplAddressValidator";

const validators: CreateConfig["validators"] = {
    xrplAddress: XrplAddressValidator,
};

export default validators;

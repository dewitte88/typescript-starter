import { registerAs } from "@nestjs/config";
import { register } from "module";

export default registerAs("names", () => ({
  foo: "bar", // Example configuration option
    // Configuration options for the names module
}));
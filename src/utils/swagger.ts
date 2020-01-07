import "reflect-metadata";
import { getMetadataArgsStorage } from "routing-controllers";
import { getFromContainer, MetadataStorage } from "class-validator";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllerOptions } from "./routingConfig";

// Parse class-validator classes into JSON Schema:
const metadatas = (getFromContainer(MetadataStorage) as any)
  .validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: "#/components/schemas"
});

// Parse routing-controllers classes into OPENAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllerOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: "basic",
        type: "http"
      }
    }
  },
  info: {
    description: "pple release version 2 API",
    title: "people2 API",
    version: "2.0.0"
  }
});

export { spec };

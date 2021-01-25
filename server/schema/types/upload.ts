import { asNexusMethod } from "nexus";
import { GraphQLUpload } from "graphql-upload";

export const Upload = asNexusMethod(GraphQLUpload, "upload");

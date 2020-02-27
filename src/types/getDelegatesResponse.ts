import Project from "./project";
import User from "./User";

export type getDelegatesResponse = User & { projects: Project[] };

import {AppRouter} from "@travelogue/backend/src/trpc";
import { createTRPCReact } from "@trpc/react-query";

const trpc = createTRPCReact<AppRouter>();
import type { Snap } from "../../../common/models/snap";
import { isLocalSnap } from "./snap";

export const shouldDisplayReconnectButton = (installedSnap: Snap | null) => installedSnap && isLocalSnap(installedSnap?.id);

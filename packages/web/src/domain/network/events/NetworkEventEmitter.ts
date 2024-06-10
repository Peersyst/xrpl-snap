import { Network } from "common/models/network/network.types";
import { EventEmitter } from "common/utils/events";

type NetworkEvents = {
    onNetworkChanged: (preevNetwork: Network, newNetwork: Network) => void;
};

export const NetworkEventEmmiter = new EventEmitter<NetworkEvents>();

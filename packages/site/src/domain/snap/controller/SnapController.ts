import State from '../../common/State';
import { ISnapState } from '../state/snapState';

export default class SnapController {
  constructor(public readonly snapState: State<ISnapState>) {}
}

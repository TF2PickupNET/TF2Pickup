import onDisconnect from './on-disconnect';
import onRoundStart from './on-round-start';
import onRoundEnd from './on-round-end';
import onRoundWin from './on-round-win';
import onLogstf from './on-logstf';
import onSay from './on-say';

const events = [
  onDisconnect,
  onRoundStart,
  onRoundEnd,
  onRoundWin,
  onLogstf,
  onSay,
];

export default events;

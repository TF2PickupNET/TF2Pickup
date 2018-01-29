import onRoundStart from './on-round-start';
import onRoundEnd from './on-round-end';
import onRoundWin from './on-round-win';
import onLogstf from './on-logstf';
import onSay from './on-say';

const events = [
  onSay,
  onRoundStart,
  onRoundEnd,
  onRoundWin,
  onLogstf,
];

export default events;

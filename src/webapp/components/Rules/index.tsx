import React from 'react';
import injectSheet from 'react-jss';

type Props = { classes: { subRules: string } };

const styles = { subRules: { paddingLeft: 20 } };

function Rules(props: Props) {
  return (
    <ol>
      <li>Don&amp;t be disrespectful to other players (especially the TF2Pickup team)</li>
      <li>
        Take the pickup seriously, do not mess around or risk getting reported/warned/banned
      </li>
      <li>
        TF2Pickup is <b>not</b> the place to learn competitive Team Fortress 2

        <ul className={props.classes.subRules}>
          <li>
            TF2Pickup is the place to improve
            your Team Fortress 2 skill in a competitive environment
          </li>
        </ul>
      </li>
      <li>Using racist or offensive usernames might result in a ban</li>
      <li>
        English is the main language of this website and game, please use this to communicate
      </li>
      <li>
        You have to be in mumble and communicating with your teammates during the entire pickup
      </li>
      <li>
        Play in the pickup you added up for;
        leaving too many pickups for no good reason may result in a ban

        <ul className={props.classes.subRules}>
          <li>Don&amp;t queue up for a pickup if you&amp;re not able to play in it</li>
          <li>Don&amp;t go AFK in the middle of a match</li>
        </ul>
      </li>
      <li>
        Permanent off-classing is frowned upon if you add up as scout/soldier (applies to 6v6)

        <ul className={props.classes.subRules}>
          <li>
            Keep it within the spirit of the game and don&amp;t run full time prolander setups
          </li>
          <li>
            We check the logs and reports for permanent off-classing and warn/ban when necessary
          </li>
        </ul>
      </li>

      <li>
        Ready up when the team is on the server,
        ask in mumble/chat for missing players and report those
      </li>
      <li>By accepting the rules I allow automatic updates from third party websites</li>
      <li>
        Common sense gets you a long way,
        don&amp;t do stupid things and have fun playing pickups
      </li>
      <li>
        Do not use alt-accounts on TF2Pickup (to join up for friends or circumvent bans etc.)
      </li>
      <li>
        Do not be a jerk to other players

        <ul className={props.classes.subRules}>
          <li>Blocking the basket in BBall will result in a ban</li>
        </ul>
      </li>
      <li>
        Report failed pickups, ragequitters, players being AFK,
        foul language or abusive behaviour/players
        <ul className={props.classes.subRules}>
          <li>Don&amp;t fake/spam reports  because you risk receiving a warning/ban</li>
        </ul>
      </li>
      <li>
        Not accepting/abiding these rules allows an admin to interpret these rules
        and act accordingly
      </li>
      <li>
        Respect and play by these rules and everyone can enjoy
        and keep enjoying Team Fortress 2 pickups
      </li>
    </ol>
  );
}

export default injectSheet<Props>(styles)(Rules);

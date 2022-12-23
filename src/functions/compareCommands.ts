import type {
  ApplicationCommand,
  ApplicationCommandOption,
  ApplicationCommandOptionData,
  GuildResolvable,
  ChatInputApplicationCommandData,
} from "discord.js";

function compareOptions(
  current: ApplicationCommandOption[],
  goal: ApplicationCommandOptionData[] | undefined
): boolean {
  // if current is empty return false
  if (!current && goal && goal.length > 0) {
    return false;
  }

  // if goal is undifined set it to empty array
  goal = goal ?? [];

  // if current is empty array then goal must be empty array or they arent equal
  if (current.length == 0) {
    if (goal.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  // if they are different length arrays then they arent equal
  if (current.length !== goal.length) {
    return false;
  }

  // the hard part where every element of the arrays are compared
  for (let a = 0; a < goal.length; a++) {
    for (let b = 0; b < current.length; b++) {
      if (goal[a].name == current[b].name) {
        // do this to get around ts being stupid
        let optionGoal: any = goal[a];
        let optionCurrent: any = current[b];

        // compare various non-object types
        if (optionGoal.type != optionCurrent.type) {
          return false;
        }
        if (optionGoal.description != optionCurrent.description) {
          return false;
        }

        // boolean is converted to string due to odd behavior when comparing booleans
        if (`${optionGoal.required ?? false}` !== `${optionCurrent.required ?? false}`) {
          return false;
        }

        //  choices will always be: [{name:string, value:string|number}], this comparison should be safe
        if (
          JSON.stringify(optionGoal.choices ?? []) != JSON.stringify(optionCurrent.choices ?? [])
        ) {
          return false;
        }

        if (!optionCurrent.options || optionCurrent.options.length == 0) {
          // if current options is empty array or undifined then goal must be too
          if (optionGoal.options && optionGoal.options.length > 0) return false;
        } else {
          // if current options isn't empty array or undifined then goal cant be either
          if (!optionGoal.options || optionGoal.options.length == 0) return false;
          // if current options & goal options arent empty or undifined then check that option recursivaly
          if (!compareOptions(optionCurrent.options, optionGoal.options)) return false;
        }

        break;
      }

      // if item dosnt exist with matching name then return false
      // sillily this means that the for loop will literally never complete, it will always be exited with either "break;" or "return false;"
      if (b >= current.length) {
        return false;
      }
    }
  }

  return true;
}

function compareCommands(
  current:
    | ApplicationCommand<{
        guild: GuildResolvable;
      }>
    | undefined,
  goal: ChatInputApplicationCommandData
) {
  if (!current) {
    return false;
  }
  if (current.description != goal.description) {
    return false;
  }
  if (current.defaultPermission != (goal.defaultPermission ?? true)) {
    return false;
  }
  if (!compareOptions(current.options, goal.options)) {
    return false;
  }

  return true;
}

export default compareCommands;

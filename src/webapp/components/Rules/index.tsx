import React from 'react';

import rules from './rules';
import SubRules from './SubRules';

export default function Rules() {
  return (
    <ol>
      {rules.map((rule) => {
        if (Array.isArray(rule)) {
          return (
            <li key={rule[0]}>
              {rule[0]}

              <SubRules rules={rule[1]} />
            </li>
          );
        }

        return (
          <li key={rule}>
            {rule}
          </li>
        );
      })}
    </ol>
  );
}

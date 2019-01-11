import Ember from "ember";
import { helper } from "@ember/component/helper";
import { htmlSafe } from "@ember/string";
const { escapeExpression } = Ember.Handlebars.Utils;

/**
 * This helper escapes a value, useful for building styles
 *
 * @example
 *   <div style={{escape (concat 'color:' ugcColour)}}></div>
 *
 */
export default helper(function(args = []) {
  return htmlSafe(escapeExpression(args[0]));
});

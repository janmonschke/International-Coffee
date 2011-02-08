(function() {
  var i18n;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.i18n = i18n = (function() {
    function i18n(language) {
      this.translate = __bind(this.translate, this);;
      this.t = __bind(this.t, this);;      this.language = language || "en";
      this.regex = /\{\{(.+?)\}\}/g;
      this.fields = [];
    }
    i18n.prototype.set_language = function(lang) {
      return this.language = lang || "en";
    };
    i18n.prototype.t = function(field, values) {
      return this.translate(field, values);
    };
    i18n.prototype.translate = function(field, values) {
      var filtered, level, match, matches, original_query, t_field, _i, _j, _len, _len2;
      original_query = field;
      if (!this.fields[this.language]) {
        return "missing translation: " + this.language + " -> " + original_query;
      }
      if (field.indexOf(".") !== -1) {
        field = field.split(".");
        t_field = this.fields[this.language];
        for (_i = 0, _len = field.length; _i < _len; _i++) {
          level = field[_i];
          if (t_field[level]) {
            t_field = t_field[level];
          } else {
            t_field = "missing translation: " + this.language + " -> " + original_query;
            break;
          }
        }
        field = t_field;
      } else {
        field = this.fields[this.language][field] || "";
      }
      if (field.length === 0) {
        return t_field = "missing translation: " + this.language + " -> " + original_query;
      }
      if (values == null) {
        return field;
      } else {
        matches = field.match(this.regex);
        for (_j = 0, _len2 = matches.length; _j < _len2; _j++) {
          match = matches[_j];
          filtered = match.replace("{{ ", "").replace(" }}", "");
          if (values[filtered] != null) {
            field = field.replace(match, values[filtered]);
          }
        }
        return field;
      }
    };
    i18n.prototype.load_fields = function(language, fields) {
      return this.fields[language] = fields;
    };
    return i18n;
  })();
}).call(this);

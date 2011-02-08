window.i18n = class i18n
  constructor : (language) ->
    @language = language || "en"
    @regex = /\{\{(.+?)\}\}/g
    @fields = []
  
  set_language : (lang) ->
    @language = lang || "en"
  
  t : (field, values) =>
    @translate(field, values)
    
  translate : (field, values) =>
    original_query = field
    unless @fields[@language]
      return "missing translation: #{@language} -> #{original_query}"
    # top level or not?
    if field.indexOf(".") != -1
      field = field.split(".")
      t_field = @fields[@language]
      for level in field
        if(t_field[level])
          t_field = t_field[level]
        else
          t_field = "missing translation: #{@language} -> #{original_query}"
          break
      field = t_field
    else
      field = @fields[@language][field] || ""
      
    if field.length == 0 then return t_field = "missing translation: #{@language} -> #{original_query}"
    
    unless values?
      # no values given, so no interpolation needed
      return field
    else
      # interpolate values
      matches = field.match(@regex)
      for match in matches
        filtered = match.replace("{{ ","").replace(" }}","")
        if values[filtered]?
          field = field.replace(match, values[filtered])
      return field

  load_fields : (language, fields) ->
    @fields[language] = fields
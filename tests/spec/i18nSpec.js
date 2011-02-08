describe("i18n", function() {
  var i;
  
  beforeEach(function(){
    i = new i18n()
  });
  
  it("should have languge 'en' if normal constructor called", function(){
    expect(i.language).toBe("en");
  });
  
  describe("no fields loaded", function(){
    it("should provide standard output if no fields have been loaded", function(){
      expect(i.t("test")).toBeDefined();

      expect(i.t("test")).toBe("missing translation: en -> test");

      expect(i.t("test.a")).toBe("missing translation: en -> test.a");

      // test with another langauage too
      i.set_language("de");

      expect(i.t("test")).toBeDefined();

      expect(i.t("test")).toBe("missing translation: de -> test");

      expect(i.t("test.a")).toBe("missing translation: de -> test.a");
    });
    
  });
    
  describe("'en' fields loaded", function(){
    beforeEach(function(){
      i.load_fields("en", {
        "test": "just a test",
        "interpolation_text": "{{ text }} with interpolation",
        "greeting": {
          "polite": "Hi there! Welcome back {{ name }} {{ surname }}",
          "rude": {
            "with": "Whatz up {{ name }}}?!",
            "without": "Whatz up dogg?!"
          }
        }
      });
    });
    
    it("should return the correct translation", function(){
      expect(i.t("test")).toBe("just a test");
      
      expect(i.t("greeting.rude.without")).toBe("Whatz up dogg?!");
    });
    
    it("should return the correct and interpolated translation", function(){
      expect(i.t("interpolation_text")).toBe("{{ text }} with interpolation");
      
      expect(i.t("interpolation_text", { text : "Test" })).toBe("Test with interpolation");
      
      expect(i.t("greeting.polite", { name : "John", surname : "Doe" })).toBe("Hi there! Welcome back John Doe");
    });
    
    it("should return standard error message when no field found", function(){
      expect(i.t("notAField")).toBe("missing translation: en -> notAField");
    });
    
    it("should return unresolved interpolation when interpolation expected but no values given", function(){
      expect(i.t("greeting.rude.with")).toBeDefined();
      expect(i.t("greeting.rude.with")).not.toBeNull();
      expect(i.t("greeting.rude.with")).toBe("Whatz up {{ name }}}?!");
    });
  });
  
});
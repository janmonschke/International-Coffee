### International-Coffee
A simple i18n implementation written in CoffeeScript.

## Usage
Include either the .js or the .coffee source file into your project.
CoffeeScript example:

    intl = new i18n() 
    # you could optionally specify the current language in the constructor like this
    # the default language is "en"
    intl = new i18n("en")

    # load english fields
    intl.load_fields("en",
        hello : "Hello {{ name }}"
        user :
            edit : "Edit user"
    )
    # load german fields
    intl.load_fields("de",
        hello : "Hallo {{ name }}"
        user :
            edit : "Benutzer bearbeiten"
    )

    # receive translations
    intl.t "user.edit" # -> "Edit user"
    # there also is support for interpolation
    intl.t "hello", name : "John" # -> "Hello John"

    # change language
    intl.set_language "de"

    # use Rails-like syntax for i18n
    window.t = intl.t
    t "user.edit" # -> "Benutzer bearbeiten"
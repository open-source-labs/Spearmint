The Spearmint Project(ver. XV)
**_These notes are incomplete, but should give some context to what exists_**
This is a brief writeup of Spearmint's initial "Weakpoints", Additions&Changes brought about by Iteration 15, and Additional Fixes/Considerations required

Spearmint Problems

Notorious B.U.G., launchers of v15, had 3 Goals
1.Documenting how Spearmint worked
2.Upgrading the Accessibility testing tool
3.Providing a POC that gave an alternative way to structure and handle the testing tools' state, because previous groups found the original too inflexible to expand on to include more Jest capabilities. React(Beta) being the playground for working out
the POC.

Existed Since We've Started:
-Some Accessibility Test existed only in name, not in functionality
-Debugging. Error messages point to bundle. Also, unable to get Electrons "devtools" to
run react DevTools
-No Error Handler for Components
-No Confirmation Dialogue before X'ing out of blocks
-No way to import a test file and make modifications on it using the UI

Changes Implemented:
For Accessibility Tool
-Dependencies updated
-A Accessibility Test

For React Testing Tool:
-new State Structure for UI to work with(found in 'updatedTestCaseReducer' file)
-abstracted add, update, delete methods and workflow(Can be traced from the component, to 'RTFsContextsProvider' file, to the
'updatedFrontendFrameworkTestCaseActions' file, to the 'updatedTestCaseReducer' file)
-functions already created for deep copying, adding, changing, and deleting (from)the state object

-Jest Abilities Not Fully Fleshed Out
-Old testing workflow(look into FireEvent, vs Screen for jest testing)
-UI not intuitive
-UI isn't organized in a way to optimize space usage(look into accordions and tabs for consolidating children to describe blocks,test blocks, etc)
-mock data implementation not intuitive. likely not implemented correctly for potential jest workflows
-a convoluted way to representing relationships between components, which represented available logic of a jest test (e.g. describes, tests/its, statements). Caused restrictions in app's capability to fully reflect what is possible with Jest testing.(e.g.implementing)
-Typescript not fully implemented(should be left last until you're feeling sure about how your central state's structure
should look)

Additinoal fixes/considerations needed needed
For the React(Beta)
-Decide for yourself which state structure makes the the most sense for you, and lends itself to implementing full jest testing capabilities
-AutoFill for options of Action and Assert Components needs to be updated wot work with
new state structure and re-enabled
-debug the Props Component so it will render properly
-Setup Teardowns need to be quanitfied in a way that can be represented
by a form like setup(e.g. user either fills out inputs or uses drags and drops
to create the setups and teardowns)
-add more jest testing capabilities that don't exist yet
-Props and Statements are not handled correctly yet by "useGenerateTest.jsx"
-in 'useGenerateTest', use visual Studios 'search' tool to find the code snippets related to 'Updated React'. there should be at least 2, 1 being 'import', the other being 'switch'. There is no need for 2 versions of 'useGenerateTest', but there exists two because of our creating a playground to be safe. the second is called 'updatedUseGenerateTest. decide how u best want to merge them, or if every Tool should have its own 'useGenerateTest' for just its switchcase.
-for the switch case 'updatedReact' found in 'useGenerateTest'(or more specifically 'updatedUseGenerateTest' if you haven't moved),
-complete the test file generating needed for the 'updated react' switch case. Needs support for statements.

-lastly,typescript

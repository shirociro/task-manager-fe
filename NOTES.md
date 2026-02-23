Stack Use
React + Redux + TanstackQuery + Validation 


Additional Features 
Persistence and Optimistic UI Updates



thought process

analyzing missing, and with the amount of missing funcitonality to present the skill that i had , i go to restructure based on how i code with scalability and documented in mind for a much better separation of concerns based on how we do projects on my previous work

Decided to crete components that will hold all 3 (TaskEdit,TaskDelete, TaskAdd) which is the Grid and the index.jsx as the Main Page for Tasks Module. On that way the Parent Page handles all the mutation and data so it would be much easier to pass the data around so it was like all the components is dependent on the parent data no independency for components

After Finishing all the functionality on tasks module i just copy the flow and process for that for my user module, like building the skeleton first.. 

After Creating Started doing mock data frontend only so I could develop frontend without any backend service 

Upon creating backend service on render using postgres + dotnet that i created and deployed I started implementing and consuming the REST API

Then Polishing on the frontend side from UI to data interaction like using tanstack query and adding optimistic updates 


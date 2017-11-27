# my_blog
## About the project
### Project goals
This project will be an online blog, once it's done. Maybe I will really host it somewhere to write
things, which might or might not interest some folks. As for the implementation, I want to invest the
biggest chunk of my work designated to this project into the frontend. This is because, I feel
relatively content about writing backends, whilst my frontend skills are quite crude. I also want
to focus on making the API as clean as possible. In previous projects, the API was not planned
that well in the beginning, which resulted in it getting messier and messier over time. To ensure
that, this doesn't happen in this project, I want to define the API as soon as possible in the
realization process.

### Challenges
This project goes not without risks. I have previously written web-apps of similar scale, but never
have I used React. Designing the frontend will also be a challenge, since my css skills are far from
being good. In the worst case however, I could use a frontend framework like
[Materialize](http://materializecss.com/), which would make things a lot easier.

### Technical aspects
- The frontend is implemented using React
- The backend is implemented using Node JS
- The project is implemented in the 5-Tier architecture. This means, that aside from the usual
three tier architecture layout, two more layers are implemented. They are:
  - __Data interface layer:__ The backend talks to the database over an ODBC driver
  - __Abstraction layer:__ All data-interaction-functionalities are available as stored procedures
- Altering blog-entries is done using database transactions

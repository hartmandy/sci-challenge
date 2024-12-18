# **Sports Card Investor Dev Challenge**

Hello SCI team!

To run the app, clone the repository, install dependencies, and use 'npm run dev'

```
npm i
npm run dev
```

---

## **Problem-Solving Approach**

I tried to write down what I found as I solved it and made comments in the code starting with "NOTE: " so it would be easy to search for changes. These are the general areas I tackled in order.

- _Fixed breaking changes that prevent app from running_ - After cloning the app and trying to run it, I saw the test issues first. I updated the typos in the tests to remove those errors.
- _Fixed breaking changes that prevents app from rendering in the browser_ - Once I had the app running, I saw issues when choosing HP from the dropdown and it wasn’t able to render properly. I made changes to the next config file for Images, like the host name and path. A width and height were also required fields on the Image component so I added that to remove errors.
- _Updated api call to make the app faster and updated errors in components_ - In the Card List component we had errors that needed fixing, those are noted with comments. I also rewrote a couple things in this component to make it faster and eliminate layout shift on loading. I removed sortKey from the useEffect so we’re not refetching data every time we choose a sort. (This initially happened when the sort buttons were clicked more than once) I memoized the result of each sort to prevent it from recalculating on every render.
- _Updated UI_ - I added a light and dark mode toggle from ShadCN. You can see those changes in the pages file and the theme provider file. I also updated the look and feel of the cards and how the stats are displayed with a ShadCN popover. While updating the UI, I also made sure every component is responsive and looks great on mobile.
- _I made changes that I would generally make for cleanup or optimization_ - I leveraged the url search params for filters. With this you could refresh and not lose your choices, or you could share the url with someone and have the filters intact. I moved types into type.ts file and import them into the files that need them. I also added a simple loading animation.
- _Added search feature_ I tried to implement search early in the exercise and it wasn't working as expected. I set it down for the end to focus on. I found the api docs online and followed that to get it working properly. I also updated the buttons to allow for asc and desc sort. I'd say that I'd typically start here in a real world problem, making sure I understood the api. I'll share the silly mistake I made here was initially searching "https://api.swu-db.com/" to look for docs, which is the url used to fetch the data. Going here without a search gives the error, "{"message":"Missing Authentication Token"}" so I thought there maybe wasn't documentation. Going to "https://https://www.swu-db.com/api" however, you can read the docs.

A couple issues that I noted

- I was getting an error I didn't recognize after adding in the theme provider for light and dark mode. I had this error because 'ThemeProvider' is being used in conjunction with the initial rendering on the server and the client, so there is a mismatch in theme. I basically just didn't give it a default behavior, for the time before the user interacts with the theme toggle. I left notes in the theme provider file on how I fixed that. Simple fix, just a mismatch of client and SSR code.

```
Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used...
```

- When updating the UI, I noticed that when there are vertical and horizontal cards displayed together in a row, the horizontal cards didn't have a clear display. The images were stretched to fill it's container and not fully visible if it was horizontal orientation. I ended up adding a step within loading to see if the image is vertical or horizontal and setting the card container accordingly. Which broke the popover UI a bit... but I fixed that too!

- An problem that I noticed is handling hp options with a "+". Even manually typing in the encoded URI for + into the fetch gave me errors with that api. example https://api.swu-db.com/cards/search?q=h=%2B3. I also noticed that the api doesn't have a 'show all' option and you must have something in your query with 'q', for it to work. So if I want to search "admiral" and see all cards, I'd first be restricted to choosing hp (we default an hp as well) and wouldn't be able to see all admiral cards of various hp levels. I added a no hp option, "--" so you can search and see all hps, but the api doesn't have a call that allows for all cards AND you must have at least one query type to make a call, so this is just a limitation that I noted.

- Searching with the parameters h and q didn’t work as expected with the api and took a little trial and error to get it working properly. After reading the docs, I also noticed that the sort could be asc or desc, so I went back and added that option as well. I had the sort options in a dropdown initially thinking that UI made sense if there was only one option but with asc and desc, the buttons make sense.

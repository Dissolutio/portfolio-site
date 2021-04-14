---
title: "Boardgame.io Projects Report: What people have been building!"
date: "2021-03-29T18:00:00.000Z"
path: "/posts/2021/bgio-spring-2021-projects-report"
tags: ["boardgame.io"]
category: "2021"
---

# Big Projects Spotted in Boardgame.io World!

My quest for answers: How best to build a baseline bgio-react codebase that unlocked the underlying tooling and functionality of BGIO, by connecting the missing pieces and hopefully _increasing_ simplicity and ease of development for those who might not be so backend savvy, like me 🙋‍♂️.

These are but a sampling of the projects out there, but because I was able to clone their repositories and run these projects without overwhelming fuss,

Without further ado, onto the projects!

## Coup (Online-Coup)

This one has a simple Join/Create lobby, 2-8 players.

### Private/Invite based matches only

With this project's setup, you have 2 options:

1. Join Match: a text input to enter a matchID
2. Create Match: a range input for number of players

Both of them also have a text input for your name. That's an important point about order of operations with the bgio /joinMatch API endpoint: The client must supply a name when joining a match.

</section>

<section>

## Briscola

Private/Public/Join

This one is cool, with cool card animations.

We see an interesting `<Route/>` in the `<Switch/>`

```js
// ...in App.js
<Route path="/demo" exact render={() => renderBriscolaClient()} />
```

But no navigation leads to this route 🤔
... Developers only! 🥳
We can see that `renderBriscolaClient` smartly yields a BGIO-Client with the debug feature included:

```js
// ...also in App.js
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { Debug } from "boardgame.io/debug";

const BriscolaClient = Client({
  game: Briscola,
  board: Board,
  multiplayer: Local(),
  debug: { impl: Debug },
});
const renderBriscolaClient = () => {
  return <BriscolaClient playerID="0" demo="true" />;
};
```

It renders just one Client with playerID="0". We can then use the BGIO Debug UI to switch to another playerID Client. Voila!

### Matchmaking magic of Briscola

Get automatically matched into an open match!
Clicking "Public Lobby" on the homepage will fire this handy bit of logic:

```js
// ...in HomePage.js
joinQueue = () => {
  const history = this.props.history;
  console.log("Joining the public queue.");
  api.listAllPublicGames().then(
    (data) => {
      const publicMatches = data.matches;
      const availablePublicMatches = [];
      for (let match of publicMatches) {
        // Check if 2nd player slot is empty
        if (match.players["1"].name === undefined) {
          availablePublicMatches.push(match);
        }
      }
      if (availablePublicMatches.length === 0) {
        api.createRoom(2, false).then((matchID) => {
          console.log(
            `No players waiting in the queue. Created a public lobby (id: ${matchID}).`
          );
          history.push("/public_lobby/" + matchID);
        });
      } else {
        console.log(
          `A player is waiting for an opponent. Joining his public lobby (id: ${availablePublicMatches[0].matchID}).`
        );
        history.push("/public_lobby/" + availablePublicMatches[0].matchID);
      }
    },
    (err) => {
      console.log(err);
    }
  );
};
```

</section>

<section>

## Udaipur

Private/Public/Join

Seems to be some kind of template pattern, this lobby is very similar to the Briscola one, and I recall seeing other similar lobbies. This apparent pattern led me to deep dive into the projects code to see how my own Lobby/Server construction could improve and change.

</section>

<section>

## PlayCamelot

One option, Create shareable link

Could be a good candidate for easiest proof of concept for boilerplate kits.

</section>

<section>

## Multibuzz

1-100 players! Create joinable match or join a match. Auto-populates `Room code` if you arrived at a room url! That means the host can just share the link, people show up and pick a display name and voila.

</section>

<section>

## Arknights: The Card Game (明日方舟: 采掘行动)

Local only, single player card game. The game has a lot of character abilities which makes for a lot of moves. The Board component is a class component with a ton of internal state and handlers. I only wish I could get an inside scoop from the passionate individual that took the time to code out such an elaborate game!

</section>

<section>

## Lewis’ House of Games

This one has an AMAZING backend, games last 30 days before being deleted? Authenticate with just a name and password? No email? Gosh, too awesome! 🤯

</section>

<section>

## Can't Stop (ChickenRoll)

This one has a great website structure to it, and lets you start a Shareable match, or a Local match. 2-5 players! Works AWESOME.

Also, it uses the `bgio-postgres` library!

### Idea for BGIO Game Phase: Use a 'setup' phase!

Super cool use of a `setup` phase, wherein players are all free to make moves that change their player color, rejoin the game (I believe the only valid way of changing your name in the match), etc.
When it's all said and done, player0 is the only client allowed to fire the `startMatch` move, which copies over a bunch of needed data over to `G` before we mosey onto the next phase. Notice, `numPlayers` gets adjusted here, that's how we are able to work our way from `MAX_PLAYERS` down to the _real_ player count.

</section>

<section>

## Boardgame (by Pong420)

This project has some next level features.

The repo uses Lerna, which is new to me but seems powerful. This project is a little more involved to get fired up, but the creator made it look good and work swimmingly. The deployment strategy seems _inherent_ to the code and directory structure.

In addition, it uses Nest.JS. There is a packages directory where we find 4 sub-directories:

1. `bgio-mongo` = a custom database adapter, sweet!
2. `e2e` - tests and test-setup, uses jest + puppeteer
3. `server` - way over my head
4. `web` - right up my alley, this directory would typically be my whole project (at least that's what I'm thinking)

### MongoDB usage: project bgio-mongo

It isn't a published package, but you can see the love in this author's custom solution. Could be the groundwork for some future projects :) Combines bgio and mongoose to interface with a mongoDB database. Rad!

</section>

# BONUS ROUND

Chickenroll has offered me so much info!!!

## Chickenroll's browser tab flash

```js
// Make the web page's title flash when it's your turn!
  useEffect(() => {
    if (!itsYourTurn) {
      return;
    }
    const title = document.title;
    let interval;
    if (itsYourTurn) {
      const titles = ["It's your turn!", title];
      // Call it right way to display "It's your turn!" as fast as possible. Then re-run
      // every 1.5 seconds.
      document.title = titles[0];
      let i = 1;
      interval = setInterval(() => {
        document.title = titles[i];
        i = 1 - i;
      }, 1500);
    }
```

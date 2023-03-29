import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { teamsByAlpha, filterTeamByName, getTeams} from './controllers/team.controller.js';
import { typeDefs } from './graph.js';
import { getPlayersAscDesc, filterPlayerByName, getPlayer, getPlayers } from './controllers/player.controller.js';
import mongoose from 'mongoose';
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp", { useNewUrlParser: true, useUnifiedTopology: true });


const resolvers = {
  Query: {
    players: async () => {
      return await getPlayers();
    },
    player: async (parent, args, context, info) => {
      return await getPlayer(args.id);
    },
    playerByName: async (parent, args, context, info) => {
      return await filterPlayerByName(args.name, args.limit);
    },
    teams: async () => {
      return await getTeams();
    },
    teamByName: async (parent, args, context, info) => {
      return await filterTeamByName(args.name, args.limit);
    },
    teamsAlpha: async () => {
      return await teamsByAlpha();
    },
    playersAscDesc: async (parent, args, context, info) => {
      return await getPlayersAscDesc(args.opc);
    },
    version: () => "1.2"
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Listening at port: ${url}`);
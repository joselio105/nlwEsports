import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (require, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    response.json(games);
});

app.get('/games/:id/ads', async (require, response) => {
    const gameId = require.params.id;
    const ads = await prisma.ad.findMany({
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            yearsPlaing: true,
            hourEnd: true,
            hourStart: true,
            weekDays: true,
            voiceChanel: true,
            game: true
        }
    });

    response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd)
        }
    }));
});

app.get('/ads/:id/discord', async (require, response) => {
    const id = require.params.id;
    const ad = await prisma.ad.findFirstOrThrow({
        where: {
            id
        },
        select: {
            discord: true
        }
    });

    response.json(ad);
});

app.post('/games/:id/ads', async (require, response) => {
    const gameId = require.params.id;
    const body: any = require.body;
    const data = {
        gameId,
        name: body.name,
        yearsPlaing: body.yearsPlaing,
        hourStart: converHoursToMinutes(body.hourStart),
        hourEnd: converHoursToMinutes(body.hourEnd),
        weekDays: body.weekDays.join(','),
        discord: body.discord,
        voiceChanel: body.voiceChanel,
    }

    //Validação -> Zod JS

    const ad = await prisma.ad.create({
        data
    });

    response.status(201).json(ad);
});

app.listen(3333);

const converHoursToMinutes = (hourString: string) => {
    const [ hours, minutes ] = hourString.split(':').map(Number);

    return minutes + hours * 60;
}

const convertMinutesToHoursString = (minutesAmount: number) => {
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}
-- DROP DATABASE IF EXISTS poketracker;
-- CREATE DATABASE poketracker;

-- \c poketracker;

DROP TABLE IF EXISTS pokemon;
CREATE TABLE pokemon (
  id            INT     PRIMARY KEY   NOT NULL,
  name          TEXT                  NOT NULL,
  height        INT                   NOT NULL,
  weight        INT                   NOT NULL,
  types         TEXT[]                NOT NULL,
  "imageSrc"    TEXT                  NOT NULL,
  owned         BOOLEAN               NOT NULL
);

COPY pokemon (id, name, height, weight, types, "imageSrc", owned) FROM stdin;
31	Nidoqueen	13	600	{Ground,Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png	f
35	Clefairy	6	75	{Fairy}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png	f
73	Tentacruel	16	550	{Poison,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/073.png	f
130	Gyarados	65	2350	{Flying,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png	f
119	Seaking	13	390	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/119.png	f
128	Tauros	14	884	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/128.png	f
124	Jynx	14	406	{Psychic,Ice}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png	f
144	Articuno	17	554	{Flying,Ice}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png	f
147	Dratini	18	33	{Dragon}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/147.png	f
4	Charmander	6	85	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png	f
143	Snorlax	21	4600	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png	f
117	Seadra	12	250	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/117.png	f
92	Gastly	13	1	{Poison,Ghost}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/092.png	f
51	Dugtrio	7	333	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/051.png	f
63	Abra	9	195	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png	f
15	Beedrill	10	295	{Poison,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/015.png	f
45	Vileplume	12	186	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/045.png	f
48	Venonat	10	300	{Poison,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/048.png	f
102	Exeggcute	4	25	{Psychic,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/102.png	f
71	Victreebel	17	155	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/071.png	f
131	Lapras	25	2200	{Ice,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png	f
50	Diglett	2	8	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/050.png	f
52	Meowth	4	42	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png	f
140	Kabuto	5	115	{Water,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/140.png	f
80	Slowbro	16	785	{Psychic,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/080.png	f
96	Drowzee	10	324	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/096.png	f
58	Growlithe	7	190	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png	f
101	Electrode	12	666	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/101.png	f
8	Wartortle	10	225	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png	f
142	Aerodactyl	18	590	{Flying,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/142.png	f
33	Nidorino	9	195	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/033.png	f
77	Ponyta	10	300	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png	f
78	Rapidash	17	950	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/078.png	f
49	Venomoth	15	125	{Poison,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/049.png	f
44	Gloom	8	86	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/044.png	f
107	Hitmonchan	14	502	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/107.png	f
106	Hitmonlee	15	498	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/106.png	f
123	Scyther	15	560	{Flying,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png	f
150	Mewtwo	20	1220	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png	f
120	Staryu	8	345	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/120.png	f
60	Poliwag	6	124	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/060.png	f
109	Koffing	6	10	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/109.png	f
66	Machop	8	195	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png	f
57	Primeape	10	320	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/057.png	f
145	Zapdos	16	526	{Flying,Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png	f
99	Kingler	13	600	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/099.png	f
76	Golem	14	3000	{Ground,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/076.png	f
5	Charmeleon	11	190	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png	f
6	Charizard	17	905	{Flying,Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png	t
9	Blastoise	16	855	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png	f
10	Caterpie	3	29	{Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png	f
146	Moltres	20	600	{Flying,Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png	f
16	Pidgey	3	18	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png	f
36	Clefable	13	400	{Fairy}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/036.png	f
53	Persian	10	320	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/053.png	f
126	Magmar	13	445	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/126.png	f
115	Kangaskhan	22	800	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/115.png	f
114	Tangela	10	350	{Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/114.png	f
47	Parasect	10	295	{Grass,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/047.png	f
32	Nidoran-m	5	90	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png	f
113	Chansey	11	346	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/113.png	f
98	Krabby	4	65	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/098.png	f
100	Voltorb	5	104	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/100.png	f
46	Paras	3	54	{Grass,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/046.png	f
29	Nidoran-f	4	70	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png	f
72	Tentacool	9	455	{Poison,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/072.png	f
93	Haunter	16	1	{Poison,Ghost}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/093.png	f
18	Pidgeot	15	395	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/018.png	f
64	Kadabra	13	565	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/064.png	f
112	Rhydon	19	1200	{Rock,Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/112.png	f
116	Horsea	4	80	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/116.png	f
94	Gengar	15	405	{Poison,Ghost}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png	f
13	Weedle	3	32	{Poison,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png	f
75	Graveler	10	1050	{Ground,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/075.png	f
103	Exeggutor	20	1200	{Psychic,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/103.png	f
81	Magnemite	3	60	{Steel,Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png	f
68	Machamp	16	1300	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/068.png	f
125	Electabuzz	11	300	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/125.png	f
151	Mew	4	40	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png	f
110	Weezing	12	95	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/110.png	f
148	Dragonair	40	165	{Dragon}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/148.png	f
149	Dragonite	22	2100	{Flying,Dragon}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png	f
127	Pinsir	15	550	{Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/127.png	f
129	Magikarp	9	100	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/129.png	f
122	Mr-mime	13	545	{Fairy,Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/122.png	f
108	Lickitung	12	655	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/108.png	f
111	Rhyhorn	10	1150	{Rock,Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/111.png	f
132	Ditto	3	40	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png	f
54	Psyduck	8	196	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png	f
86	Seel	11	900	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/086.png	f
95	Onix	88	2100	{Ground,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/095.png	f
83	Farfetchd	8	150	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/083.png	f
90	Shellder	3	40	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/090.png	f
82	Magneton	10	600	{Steel,Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/082.png	f
134	Vaporeon	10	290	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png	f
38	Ninetales	11	199	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png	f
74	Geodude	4	200	{Ground,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/074.png	f
97	Hypno	16	756	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/097.png	f
2	Ivysaur	10	130	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png	t
11	Metapod	7	99	{Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png	f
7	Squirtle	5	90	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png	f
14	Kakuna	6	100	{Poison,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/014.png	f
34	Nidoking	14	620	{Ground,Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/034.png	f
42	Golbat	16	550	{Flying,Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/042.png	f
43	Oddish	5	54	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png	f
37	Vulpix	6	99	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png	f
139	Omastar	10	350	{Water,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/139.png	f
69	Bellsprout	7	40	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/069.png	f
17	Pidgeotto	11	300	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/017.png	f
70	Weepinbell	10	64	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/070.png	f
141	Kabutops	13	405	{Water,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/141.png	f
118	Goldeen	6	150	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/118.png	f
104	Cubone	4	65	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png	f
56	Mankey	5	280	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/056.png	f
28	Sandslash	10	295	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/028.png	f
27	Sandshrew	6	120	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png	f
135	Jolteon	8	245	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png	f
26	Raichu	8	300	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png	f
40	Wigglytuff	10	120	{Fairy,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/040.png	f
138	Omanyte	4	75	{Water,Rock}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/138.png	f
79	Slowpoke	12	360	{Psychic,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/079.png	f
105	Marowak	10	450	{Ground}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/105.png	f
30	Nidorina	8	200	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/030.png	f
87	Dewgong	17	1200	{Ice,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/087.png	f
88	Grimer	9	300	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/088.png	f
41	Zubat	8	75	{Flying,Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png	f
136	Flareon	9	250	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/136.png	f
62	Poliwrath	13	540	{Fighting,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/062.png	f
85	Dodrio	18	852	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/085.png	f
55	Golduck	17	766	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/055.png	f
67	Machoke	15	705	{Fighting}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/067.png	f
65	Alakazam	15	480	{Psychic}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/065.png	f
24	Arbok	35	650	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png	f
22	Fearow	12	380	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/022.png	f
39	Jigglypuff	5	55	{Fairy,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png	f
23	Ekans	20	69	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png	f
91	Cloyster	15	1325	{Ice,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/091.png	f
25	Pikachu	4	60	{Electric}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png	f
84	Doduo	14	392	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/084.png	f
21	Spearow	3	20	{Flying,Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/021.png	f
20	Raticate	7	185	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/020.png	f
61	Poliwhirl	10	200	{Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/061.png	f
133	Eevee	3	65	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png	f
59	Arcanine	19	1550	{Fire}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/059.png	f
3	Venusaur	20	1000	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png	f
1	Bulbasaur	7	69	{Poison,Grass}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png	f
121	Starmie	11	800	{Psychic,Water}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/121.png	f
137	Porygon	8	365	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/137.png	f
19	Rattata	3	35	{Normal}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png	f
12	Butterfree	11	320	{Flying,Bug}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png	f
89	Muk	12	300	{Poison}	https://assets.pokemon.com/assets/cms2/img/pokedex/full/089.png	f
\.

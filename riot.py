import subprocess
import urllib
import json
import time

#scoreboard icons: http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png [champion, gold, items, minion, score, spells]

key = "RGAPI-c3e9bfe3-1ed6-453e-8e8a-797c2188b714"

summonerid = ""

curtains = "---------------------------------------------------------------"
print curtains
print "Espot.gg API-query"
print "Enter your account details."
print

while True:
	try:
	    summoner = raw_input("Insert your summoner name:")
	    print "Regions: BR, EUNE, EUW, JP, KR, LAN, LAS, NA, OCE, TR, RU, PBE" 
	    region = raw_input("Insert your region:")
	    #summonerhaku = "https://na.api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" +summoner + "?api_key=" + key
	    #print summonerhaku
	    #output = subprocess.check_output("curl --request GET '%s' --include" %(summonerhaku), shell = True)
	    #print output
	    break
	except Exception:
	    print "Something went wrong."
	   

idsearch = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summoner + "?api_key=" + key  #Summoner ID-haku

#ID Json-build
idgrep = urllib.urlopen(idsearch)
response = json.load(idgrep)

print
#Summoner-tarkastus
try:
    ID = response[summoner]['id']
except KeyError:
    print "Summoner doesn't exist."
    print "Logging out..."
    time.sleep(2)
    exit()

ID = str(ID)


masteryscore = "https://"+ region +".api.pvp.net/championmastery/location/EUN1/player/"+ ID + "/score?api_key=" + key #Mastery-haku
ranked = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + ID + "/ranked?season=SEASON2016&api_key=" + key #Ranked Stats-haku

#Mastery / Ranked JSON lataus + Stats haut/variaabeliluonnit
m_score = urllib.urlopen(masteryscore)
m_score = json.load(m_score)
rankedopen = urllib.urlopen(ranked)
rankedstats = json.load(rankedopen)
rankedstats = rankedstats['champions'][-1]['stats']
rankedstats_physicaldamage = rankedstats['totalPhysicalDamageDealt']
rankedstats_totalturretskilled = rankedstats['totalTurretsKilled']
rankedstats_totaldamagedealt = rankedstats['totalDamageDealt']
rankedstats_totalmagicdamagedealt = rankedstats['totalMagicDamageDealt']
rankedstats_totaldoublekills = rankedstats['totalDoubleKills']
rankedstats_totalpentakills = rankedstats['totalPentaKills']
if rankedstats_totalpentakills == 0: #ninja edit ;)
    rankedstats_totalpentakills = "0 :("
rankedstats_totaltriplekills = rankedstats['totalTripleKills']

#Hakujen Outputit
print "Summoner Name:", summoner
print "Region:", region
print "Summoner ID:", ID
print "Champion Mastery Score:", m_score
print
print "Offensive Stats:"
print "Total Damage Dealt:", rankedstats_totaldamagedealt
print "Psysical Damage Dealt:", rankedstats_physicaldamage
print "Total Magic Damage Dealt:", rankedstats_totalmagicdamagedealt
print "Turrets Killed:", rankedstats_totalturretskilled
print "Double Kills:", rankedstats_totaldoublekills
print "Triple Kills:", rankedstats_totaltriplekills
print "Penta Kills:", rankedstats_totalpentakills

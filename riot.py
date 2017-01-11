import subprocess
import urllib
import json

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
	    region = raw_input("Insert your region:")
	    #summonerhaku = "https://na.api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" +summoner + "?api_key=" + key
	    #print summonerhaku
	    #output = subprocess.check_output("curl --request GET '%s' --include" %(summonerhaku), shell = True)
	    #print output
	    break
	except Exception:
	    print "Something went wrong."
	   

idsearch = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summoner + "?api_key=" + key 

print idsearch

idgrep = urllib.urlopen(idsearch)

response = json.load(idgrep)

ID = response[summoner]['id']
ID = str(ID)

ranked = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + ID + "/ranked?season=SEASON2016&api_key=" + key

print ranked

rankedopen = urllib.urlopen(ranked)
rankedstats = json.load(rankedopen)
rankedstats = rankedstats['champions'][0]['stats']
rankedstats_physicaldamage = rankedstats['totalPhysicalDamageDealt']
rankedstats_totalturretskilled = rankedstats['totalTurretsKilled']
rankedstats_totaldamagedealt = rankedstats['totalDamageDealt']
rankedstats_totalmagicdamagedealt = rankedstats['totalMagicDamageDealt']
rankedstats_totaldoublekills = rankedstats['totalDoubleKills']
rankedstats_totalpentakills = rankedstats['totalPentaKills']
rankedstats_totaltriplekills = rankedstats['totalTripleKills']

print
print "Summoner Name:", summoner
print "Region:", region
print "Summoner ID:", ID
print
print "Offensive Stats:"
print "Total Damage Dealt:", rankedstats_totaldamagedealt
print "Psysical Damage Dealt:", rankedstats_physicaldamage
print "Total Magic Damage Dealt:", rankedstats_totalmagicdamagedealt
print "Turrets Killed:", rankedstats_totalturretskilled
print "Double Kills:", rankedstats_totaldoublekills
print "Triple Kills:", rankedstats_totaltriplekills
print "Penta Kills:", rankedstats_totalpentakills


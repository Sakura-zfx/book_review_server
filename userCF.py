#encode: utf-8

import sys
import operator
import math
import json

prefs = {}
compute_user = ''
for i in range(len(sys.argv)):
  if i == 0:
    continue
  if i == 1:
    compute_user = sys.argv[1]
    continue
  parts = json.loads(sys.argv[i])
  userId = str(parts['userId'])
  bookId = str(parts['bookId'])
  score = str(parts['score'])
  prefs.setdefault(userId, {})
  prefs[userId].update({bookId: score})

def jaccard_distance(prefs, user1, user2):
    s1 = set(prefs[user1].keys())
    s2 = set(prefs[user2].keys())
    return 1.0 * len(s1 & s2) / len(s1 | s2)

def top_matches(prefs, user1, similarity, n = 5):
    scores = [(similarity(prefs, user1, user2), user2) for user2 in prefs if user1 != user2]
    scores.sort()
    scores.reverse()
    for i in scores[:]:
        if(i[0] == 1):
          scores.remove(i)
    return scores[0:n]

def calculate_user_cf(prefs, compute_user, similarity, n = 10):
    ret = {}
    scores = top_matches(prefs, compute_user, similarity, n)
    ret[compute_user] = scores
    return ret

def print_recomendation(prefs, similiar_users, min_score = 0.1):
    for target_user in similiar_users:
        itemId_cnt = {}
        for score, similiar_user in similiar_users[target_user]:
            if score > min_score:
                for itemId in set(prefs[similiar_user]) - set(prefs[target_user]):
                    itemId_cnt.setdefault(itemId, 0)
                    itemId_cnt[itemId] += (1 * score)
        recommends_itemId_cnt = sorted(itemId_cnt.items(), key=operator.itemgetter(1), reverse=True)
        print(json.dumps(recommends_itemId_cnt))

similiar_users = calculate_user_cf(prefs, compute_user, jaccard_distance, n = 10)
print_recomendation(prefs, similiar_users)
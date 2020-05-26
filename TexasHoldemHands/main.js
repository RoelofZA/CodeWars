function sortHand(a, b) {

  var valA = 0;
  var valB = 0;
  var aSplit = a.slice(0, a.length-1);
  var bSplit = b.slice(0, b.length-1);

  if (isNaN(aSplit))
  {
    switch (aSplit) {
      case 'A':
        valA = 14;
        break;
      case 'K':
        valA = 13;
        break;
      case 'Q':
          valA = 12;
          break;
      case 'J':
        valA = 11;
        break;
    }
  }
  else
    valA = parseInt(aSplit);

    if (isNaN(bSplit))
    {
      switch (bSplit) {
        case 'A':
          valB = 14;
          break;
        case 'K':
          valB = 13;
          break;
        case 'Q':
          valB = 12;
            break;
        case 'J':
          valB = 11;
          break;
      }
    }
    else
      valB = parseInt(bSplit);

  return valB - valA;
}

function sortHand2(a, b) {

  var valA = 0;
  var valB = 0;
  var aSplit = a;
  var bSplit = b;

  if (isNaN(aSplit))
  {
    switch (aSplit) {
      case 'A':
        valA = 14;
        break;
      case 'K':
        valA = 13;
        break;
      case 'Q':
          valA = 12;
          break;
      case 'J':
        valA = 11;
        break;
    }
  }
  else
    valA = parseInt(aSplit);

    if (isNaN(bSplit))
    {
      switch (bSplit) {
        case 'A':
          valB = 14;
          break;
        case 'K':
          valB = 13;
          break;
        case 'Q':
          valB = 12;
            break;
        case 'J':
          valB = 11;
          break;
      }
    }
    else
      valB = parseInt(bSplit);

  return valB - valA;
}

function nextCard(a) {

  var valA = 0;
  //a = a.slice(0, a.length-1);

    switch (a) {
      case 'A':
        valA = 'K';
        break;
      case 'K':
        valA = 'Q';
        break;
      case 'Q':
          valA = 'J';
          break;
      case 'J':
        valA = '10';
        break;
      default:
        valA = (parseInt(a)-1).toString();
        break;
    }

  return valA;
}

function Filter2 (v) {
  return v.indexOf('1') >= 0;
}

function hand(holeCards, communityCards) {
    var ranks = {};
    var suits = {};
    var type = 'nothing';

    var orderedList = communityCards.concat(holeCards).sort(sortHand);

    for (const iterator of orderedList) {
      var splitVal = [];
      
      if (iterator.length == 2)
        splitVal = iterator.split('');
      else
       splitVal = ["10", iterator.slice(2,3)];

      if (ranks[splitVal[0]] == undefined)
        ranks[splitVal[0]] = 0;

      if (suits[splitVal[1]] == undefined)
        suits[splitVal[1]] = 0;

      ranks[splitVal[0]] += 1;
      suits[splitVal[1]] += 1;
    }

    /*
    Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
    Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
    Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
    Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
    Straight (five consecutive ranks). Higher rank is better.
    Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
    Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
    Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
    Nothing. Tiebreaker is the rank of the cards from high to low.
    */

    // Straight-flush
    if (Object.entries(suits).filter(([k,v]) => v>=5).length == 1)  {

      var suitS = Object.entries(suits).filter(([k,v]) => v>=5)[0][0];
      var filterSuit = orderedList.filter( v =>  v.indexOf(suitS) >= 0  );
      filterSuit = [...new Set(filterSuit.map(x=>x.slice(0, x.length-1)))];


      for (let index = 0; index <= filterSuit.length - 5; index++) {
        const element = filterSuit[index];
        var IsStraight = false;
  
        for (let checkIndex = index+1; checkIndex < index+5; checkIndex++) {
          if (filterSuit[checkIndex] == nextCard(filterSuit[checkIndex-1]) ) {
            IsStraight = true;
          }
          else 
          {
            IsStraight = false;
            break;
          }
        }
        if (IsStraight) {
          return {type: 'Straight-flush', ranks: filterSuit.slice(index, index+5)  };
        }
      }
    }

    // Four of a kind
    if (Object.entries(ranks).filter(([k,v]) => v==4).length == 1) {

      var result = [];
      result.push(Object.entries(ranks).filter(([k,v]) => v==4)[0][0]);
      var nextItem = orderedList.filter(x=> x.indexOf(result[0]) == -1)[0];
      result.push(nextItem.slice(0, nextItem.length-1));

      return {type: 'Four-of-a-kind', ranks: result };
    }

    // Full House
    if (Object.entries(ranks).filter(([k,v]) => v==3).length > 1 ||
        (Object.entries(ranks).filter(([k,v]) => v==3).length > 0 && Object.entries(ranks).filter(([k,v]) => v==2).length > 0)) {
          var result = [];

          if (Object.entries(ranks).filter(([k,v]) => v==3).length > 1)
          {
            for (const iterator of Object.entries(ranks).filter(([k,v]) => v==3).sort()) {
              result.push(iterator[0]);

            }
            return {type: 'Full house', ranks: result };
          }

          result.push(Object.entries(ranks).filter(([k,v]) => v==3)[0][0]);
          result.push(Object.entries(ranks).filter(([k,v]) => v==2).sort()[0][0]);
          return {type: 'Full house', ranks: result };
        }

    // Flush
    if (Object.entries(suits).filter(([k,v]) => v>=5).length >= 1)  {
      var suitS = Object.entries(suits).filter(([k,v]) => v>=5)[0][0];
      var filterSuit = orderedList.filter( v =>  v.indexOf(suitS) >= 0  );
      return {type: 'Flush', ranks: filterSuit.filter((val,idx) => idx < 5).map(x=>x.slice(0, x.length-1))};
    }

    // Straight
    for (let index = 0; index <= [...new Set(orderedList.map(x=>x.slice(0, x.length-1)))].length - 5; index++) {
      IsStraight = false;

      var uniq = [...new Set(orderedList.map(x=>x.slice(0, x.length-1)))];

      for (let checkIndex = index+1; checkIndex < index+5; checkIndex++) {
        if (uniq[checkIndex] == nextCard(uniq[checkIndex-1]) ) {
          IsStraight = true;
        }
        else 
        {
          IsStraight = false;
          break;
        }
      }
      if (IsStraight) {
        return {type: 'Straight', ranks: uniq.slice(index, index+5)  };
      }
    }

    // Three-of-a-kind
    if (Object.entries(ranks).filter(([k,v]) => v==3).length == 1) {

      var newList = orderedList.map(x=>x.slice(0, x.length-1));
      var resultList = newList.filter(x=>x != Object.entries(ranks).filter(([k,v]) => v==3)[0][0]).slice(0, 2);
      resultList.unshift(Object.entries(ranks).filter(([k,v]) => v==3)[0][0]);

      return {type: 'Three-of-a-kind', ranks: resultList  };
    }

    // Two pair
    if (Object.entries(ranks).filter(([k,v]) => v==2).length >= 2) {

      var newList = orderedList.map(x=>x.slice(0, x.length-1));
      var pairList = [];
      Object.entries(ranks).filter(([k,v]) => v==2).forEach(element => {
        pairList.push(element[0]);
      });
      pairList = pairList.sort(sortHand2).slice(0, 2);
      var resultList = newList.filter(x=> !pairList.includes(x)).slice(0, 1);
      resultList.unshift(...pairList);

      return {type: 'Two pair', ranks: resultList  };
    }

    // Pair
    if (Object.entries(ranks).filter(([k,v]) => v==2).length == 1) {

      var newList = orderedList.map(x=>x.slice(0, x.length-1));
      var pairList = [];
      Object.entries(ranks).filter(([k,v]) => v==2).forEach(element => {
        pairList.push(element[0]);
      });
      pairList = pairList.sort(sortHand2).slice(0, 1);
      var resultList = newList.filter(x=> !pairList.includes(x)).slice(0, 3);
      resultList.unshift(...pairList);

      return {type: 'Pair', ranks: resultList  };
    }



    return {type: type, ranks: orderedList.map(x=>x.slice(0, x.length-1)).slice(0,5)};
  }



 
//console.log(hand(['A♠','K♦'],['J♥','5♥','10♥','Q♥','3♥']));

console.log(hand(['8♥','7♦'],['J♣','7♥','8♣','9♥','10♣']));

console.log(hand(['A♠','K♦'],['7♥','6♥','5♣','4♥','3♥']));

console.log(hand(['K♥','A♥'],['J♥','Q♥','10♥','2♥','3♥']));

console.log(hand(['K♦','K♠'],['K♣','K♥','10♥','2♥','3♥']));

console.log(hand(['K♦','K♠'],['K♣','A♥','A♦','A♠','3♥']));
console.log(hand(['K♦','K♠'],['K♣','A♥','A♦','4♠','3♥']));
console.log(hand(['K♦','2♠'],['K♣','A♥','A♦','A♠','3♥']));

console.log(hand(['K♥','A♦'],['J♣','Q♥','9♥','2♥','3♥']));

console.log(hand(['K♠','A♦'],['J♣','Q♥','10♥','2♥','3♦']));

console.log(hand(['K♠','A♦'],['9♣','Q♥','9♥','2♥','9♦']));


console.log(hand(['K♠','Q♦'],['J♣','Q♥','9♥','2♥','9♦']));

console.log(hand(['K♠','3♦'],['J♣','Q♥','9♥','2♥','9♦']));




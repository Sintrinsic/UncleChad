
var lastComparisonQualifier;
var comparisonQualifiers = [
  "It's better than",
  "It's like",
  "It's almost like",
  "It's kinda like",
  "It's worse than",
  "Imagine"
]

var lastObject;
var objects = [
  "dog",
  "cat",
  "chipmunk",
  "zebra",
  "bobcat",
  "frog",
  "camel",
  "chicken",
  "duck",
  "beaver",
  "elephant",
  "guinea pig",
  "jellyfish",
  "kangaroo",
  "llama",
  "octopus",
  "snake",
  "rat",
];

var lastVerb;
var verbs = [
  "tickling",
  "stomping on",
  "petting",
  "sniffing",
  "riding on",
  "eating",
  "cooking",
  "dragging",
  "talking to",
  "torturing",
  "abducting",
  "beating",
  "gnawing on",
];

var lastPart;
var parts = [
  "hair",
  "ear",
  "stomach",
  "toe",
  "head",
  "scalp",
  "arm",
  "leg",
  "intestine",
  "body fat",
  "eye ball",
  "eyebrow",
  "cuticals",
  "elbow",
  "brain",
  "trachea",
  "kidney",
  "liver",
  "heart",
  "lungs",
  "hip",
  "knee",
  "armpit",
  "chin",
  "mouth",
  "chest",
  "shoulder"
]
var lastTarget;



objects.push(
  "dick",
  "pussy",
  "vagina",
  "cock",
  "dildo",
  "sex toy",
  "anal probe",
  "cum bucket",
  "sheep fucker",
  "cum guzzler",
  "bitch",
  "cocksucker",
  "dickhead",
  "slut")

verbs = [
  "fucking",
  "penetrating",
  "running a train on",
  "masturbating with",
  "masturbating to",
  "sodomizing",
  "riding on",
  "sucking",
  "twisting",
  "prodding",
  "mounting",
  "pissing on",
  "cumming on",
  "peeing on",
  "jacking off to",
  "jacking off on",
  "chopping off",
  "sucking on",
  "climbing on",
  "humping",
  "dry humping",
  "climaxing on",
  "ejaculating on",
  "stroking",
  "banging",
  "having sex with",
  "deep throating",
  "fisting",
  "giving a blowjob to",
  "fingering",
  "having an orgy with",
  "squirting on",
  "having a threesome with"
];

parts = [
  "brain",
  "skull",
  "trachea",
  "lungs",
  "armpit",
  "chin",
  "mouth",
  "chest",
  "pussy",
  "vagina",
  "cock",
  "dick",
  "penis",
  "anus",
  "asshole",
  "eye socket",
  "gaping hole",
  "dick hole",
  "erection",
  "balls",
  "testicles",
  "nipple",
  "clit"
];





function getAdvice(){
  var outStr = GetComparisonQualifer() + ' ' + GetObject() + ' ' + GetVerb() + ' ' + GetTarget();
  return outStr;
}


function GetRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function GetTarget() {
  var target = GetPart();

  if (target == lastTarget || target.includes(lastObject)) {
    target = GetTarget();
  }

  lastTarget = target;
  return lastTarget;
}

function GetObject() {
  var newObject = GetObjectTemp(true);
  if (newObject == lastObject) {
    newObject = GetObject();
  }
  lastObject = newObject;
  return lastObject;
}

function GetObjectTemp(allowMultiple) {
  var amount = Math.min(getRandomInt(5), getRandomInt(5));
  var res = GetRandom(objects);
  if (allowMultiple && amount > 1) {
    res = amount + " " + GetPluralForm(res);
  } else {
    var article = "a ";
    if (res.match('^[aieouAIEOU].*')) {
      article = "an ";
    }
    res = article + res;
  }
  return res;
}

function GetComparisonQualifer() {
  var newQualifier = GetRandom(comparisonQualifiers);
  if (newQualifier == lastComparisonQualifier) {
    newQualifier = GetComparisonQualifer();
  }
  lastComparisonQualifier = newQualifier;
  return lastComparisonQualifier;
}

function GetVerb() {
  var newVerb = GetRandom(verbs);
  if (newVerb == lastVerb) {
    newVerb = GetVerb();
  }
  lastVerb = newVerb;
  return lastVerb;
}

function GetPart() {
  var newPart;
  if (Math.random() > .5) {
    newPart = GetPluralForm(GetObjectTemp(false), true);
  } else {
    newPart = "your";
  }

  newPart = newPart + " " + GetRandom(parts);

  if (newPart == lastPart) {
    newPart = GetPart();
  }
  lastPart = newPart;
  return lastPart;
}

function GetPluralForm(single, isPossessive) {
  return single + GetPluralSuffix(single, isPossessive);
}

function GetPluralSuffix(single, isPossessive) {
  var suffix = "";
  if (isPossessive) {
    suffix = "'s";
    if (single.match('.*s$')) {
      suffix = "'";
    }
  } else {
    suffix = "s";
    if (single.match('.*[s|(sh)|(ch)|x|z]$')) {
      suffix = "es";
    }
  }
  return suffix;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = { getAdvice }
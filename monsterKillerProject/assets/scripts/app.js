const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let choosenMaxLife = 100;
let currentMonsterHealth = choosenMaxLife;
let currentPlayerHealth = choosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(choosenMaxLife);

function endRound(){
  const initialPlayerHealth = currentPlayerHealth; 
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentPlayerHealth <= 0 && hasBonusLife ){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('You would be dead but the bonus life saved you!');
    setPlayerHealth();
  }
  if(currentMonsterHealth <= 0  && currentPlayerHealth > 0){
    alert('You won!');
  } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
    alert('You lost!');
  }else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
    alert('You have a draw!');
  }
}

function attackMonster(mode){
  let maxDamage ;
  if(mode === 'ATTACK'){
    maxDamage = ATTACK_VALUE; 
  }else{
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
  
}

function attackHandler(){
  attackMonster('ATTACK');
}

function strongAttackHandler(){
 attackMonster('STRONG_ATTACK');
}

function healPlayerHandler(){
  let healValue;
  if(currentPlayerHealth >= choosenMaxLife - HEAL_VALUE){
    alert(" can't heal more than your max initial health");
    healValue = choosenMaxLife - currentPlayerHealth;
  }else{
    healValue = HEAL_VALUE
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler); 
strongAttackBtn.addEventListener('click', strongAttackHandler); 
healBtn.addEventListener('click', healPlayerHandler);
import { Component } from '@angular/core';

enum Player{
  None='',
  X='X',
  O='O'
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  cells:Player[]=new Array(9).fill(Player.None);
  currentPlayer:Player=Player.X;
  winner:Player|null=null;
  gameover:boolean=false;
  totalMoves=0;

  makeMove(index:number):void{
    if(!this.cells[index] && !this.gameover){
      this.cells[index]=this.currentPlayer;
      this.totalMoves++;
      this.checkWinner();
      this.currentPlayer=this.currentPlayer===Player.X?Player.O:Player.X;
    }
    if(this.totalMoves==9)
    {
      this.gameover=true;
    }

    if(this.winner)
    {
      alert(`Player ${this.winner} wins!!!`);
      this.reset();
    }
    else if(this.gameover)
    {
      alert('It\'s a draw!!!');
      this.reset();
    }
  
  }


  checkWinner():void{
    const winnerPositions:number[][]=[
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for(const [a,b,c] of winnerPositions)
    {
      debugger
      if(
        this.cells[a]!=Player.None&&
        this.cells[a]===this.cells[b]&&
        this.cells[a]==this.cells[c]
      )
      {
        debugger
        this.winner=this.cells[a];
        this.gameover=true;
        break;
      }
    }

  }

reset():void{
  this.cells.fill(Player.None);
  this.currentPlayer=Player.X;
  this.winner=null;
  this.gameover=false;
}
}

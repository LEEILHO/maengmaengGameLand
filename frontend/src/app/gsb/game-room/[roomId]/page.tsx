'use client'

import withAuth from '@components/hoc/client/PrivateRoute'
import React, { useEffect, useState } from 'react'

import * as S from '@styles/gsb/GameRoom.styled'
import TurnCard from '@components/gsb/client/TurnCard'
import Timer from '@components/common/clients/Timer'
import PlayerCard from '@components/gsb/client/PlayerCard'
import { images } from '@constants/images'
import CombinationGsb from '@components/gsb/client/CombinationGsb'
import Betting from '@components/gsb/client/Betting'
import BettingStatus from '@components/gsb/client/BettingStatus'
import RoundResult from '@components/gsb/client/RoundResult'
import BarTimer from '@components/common/clients/BarTimer'
import useSocketGsb from '@hooks/useSocketGsb'
import { usePathname } from 'next/navigation'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  AllBetChipsState,
  CurrentPlayerState,
  DisplayMessageState,
  MyBetChipsState,
  MyState,
  OpponentBetChipsState,
  OpponentState,
  RoundState,
  TimerState,
} from '@atom/gsbAtom'
import { userState } from '@atom/userAtom'

const GameRoom = () => {
  const {
    connectSocket,
    disconnectSocket,
    connectGsb,
    disconnectGsb,
    handleChoiceTurnCard,
    handleGSBComb,
    handleBetting,
  } = useSocketGsb()
  // const gameCode = usePathname().split('/')[3]

  // 전광판 하나로 해서 상황에 따라 메세지만 바꾸기
  const displayMessage = useRecoilValue(DisplayMessageState)
  const round = useRecoilValue(RoundState)
  const time = useRecoilValue(TimerState)
  const my = useRecoilValue(MyState)
  const opponent = useRecoilValue(OpponentState)
  const myBetChips = useRecoilValue(MyBetChipsState)
  const opponentBetChips = useRecoilValue(OpponentBetChipsState)
  const currentPlayer = useRecoilValue(CurrentPlayerState)
  const user = useRecoilValue(userState)
  const AllBetChips = useRecoilValue(AllBetChipsState)

  useEffect(() => {
    connectSocket(connectGsb, disconnectGsb)
    return () => {
      disconnectSocket()
    }
  }, [])

  useEffect(() => {
    console.log(round, '입니다.')
  }, [round])

  return (
    <S.GameRoomContainer>
      <S.TopRow>
        <S.DisplayBoard>{displayMessage}</S.DisplayBoard>
        <BarTimer time={time} />
      </S.TopRow>
      <S.CenterRow>
        <PlayerCard player={my} />
        <S.Content>
          {round === 'Combination' && (
            <CombinationGsb handleGSBComb={handleGSBComb} />
          )}
          <CombinationGsb handleGSBComb={handleGSBComb} />
          <BettingStatus myBet={myBetChips} opponentBet={opponentBetChips} />
          {(round === 'Betting' ||
            round === 'BetWaiting' ||
            round === 'Combination' ||
            round === 'CombWaiting') && (
            <BettingStatus myBet={myBetChips} opponentBet={opponentBetChips} />
          )}
          {(round === 'Result' ||
            round === 'DrawResult' ||
            round === 'GiveUpResult') && <RoundResult />}
        </S.Content>
        <PlayerCard player={opponent} />
      </S.CenterRow>
      {round === 'Betting' && <Betting handleBetting={handleBetting} />}
      {round === 'ChoiceTurn' && (
        <TurnCard handleChoiceTurnCard={handleChoiceTurnCard} />
      )}

      {round === 'Result' && (
        <S.BottomRow>
          <S.ManyChips src={images.gsb.allChipsBet} />
          <S.AllBetChips>{AllBetChips}</S.AllBetChips>
        </S.BottomRow>
      )}
    </S.GameRoomContainer>
  )
}

export default withAuth(GameRoom)

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { formatter } from "../../../utils/currency_formatter";
import { useCoinContext } from '../home/Context';
import { CoinDetailsResponse, CoinPriceProps, DeveloperCardProps, NameCoinProps } from './Interface';
import {
    Card, CardSubtitle, CardTitle, CoinImage, CoinOtherPercentage, LinkCustom, MarketCap, Name, Price,
    PricePercentage, PriceTitle, Rating, Symbol
} from './Style';

function CoinDetails() {
    let params = useParams();
    const [coinDetails, setCoinDetails] = React.useState<CoinDetailsResponse>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { coinContext } = useCoinContext();

    const getCoinDetails = async () => {
        setIsLoading(true);
        const { data } = await api.get<CoinDetailsResponse>(`/coins/${params.coin}`);
        setIsLoading(false);

        setCoinDetails(data);
    }
    useEffect(() => {
        getCoinDetails();
    }, []);

    function Path() {
        return (
            <Box sx={{ margin: '56px 0' }}>
                {
                    <Typography >
                        <LinkCustom to={'/'} >Criptomoedas &gt; Moedas &gt;</LinkCustom> <span color="#000">{coinDetails?.name} </span>
                    </Typography>
                }
            </Box>
        );
    }
    function NameCoin(props: NameCoinProps) {
        return (
            <Box >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoinImage src={props.image} />
                    <Name >{props.name}</Name>
                    <Symbol >{props.symbol?.toUpperCase()}</Symbol>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Rating>Classificação #{props.coingecko_rank}</Rating>
                </Box>
            </Box>
        );
    }

    function CoinPrice(props: CoinPriceProps) {
        const isUp = (props.percentage ?? 0) > 0;
        const color = isUp ? '#16C784' : '#EA3943';
        let percentage = isUp ? props.percentage : ((props.percentage ?? 0) * (-1));

        return (
            <Box>
                <PriceTitle >Preço de {props.name} ({props.symbol?.toUpperCase()}) </PriceTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Price >{formatter.format(props.price ?? 0)}</Price>
                    <PricePercentage style={{
                        background: color,
                    }}>
                        {isUp ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        {percentage?.toFixed(2)}%
                    </PricePercentage>
                </Box>
                {coinContext?.additionInfo?.filter(item => item.id !== params.coin).map(item => {
                    const isUp = item.percentage > 0;
                    const color = isUp ? '#16C784' : '#EA3943';
                    let percentage = isUp ? props.percentage : ((props.percentage ?? 0) * (-1));
                    return <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <MarketCap>{item.market_cap} {item.symbol.toUpperCase()}</MarketCap>
                        <CoinOtherPercentage style={{ color }}>
                            {isUp ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            {item.percentage.toFixed(2)}%
                        </CoinOtherPercentage>
                    </Box>;
                }
                )}
            </Box >
        );
    }

    function DeveloperCard(props: DeveloperCardProps) {
        return (
            <Box display={'flex'}>
                <Card>
                    <CardTitle>{props.title}</CardTitle>
                    <CardSubtitle>{props.subtitle}</CardSubtitle>
                </Card>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ height: '100vh', width: '90%', fontFamily: 'Inter' }}>
                {
                    isLoading ?
                        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress color="success" />
                        </Box>
                        :
                        <Box>
                            <Path />
                            <Box sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: 'space-between' }}>
                                <NameCoin
                                    name={coinDetails?.name}
                                    image={coinDetails?.image.thumb}
                                    symbol={coinDetails?.symbol}
                                    coingecko_rank={coinDetails?.coingecko_rank}
                                />
                                <CoinPrice
                                    name={coinDetails?.name}
                                    symbol={coinDetails?.symbol}
                                    percentage={coinDetails?.market_data.price_change_percentage_24h}
                                    price={coinDetails?.market_data.current_price.usd}
                                />
                            </Box>
                            <Box sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: 'space-evenly', marginTop: '80px' }}>
                                <DeveloperCard
                                    title="GitHub Followers"
                                    subtitle={coinDetails?.developer_data?.subscribers.toString() ?? ''}
                                />
                                <DeveloperCard
                                    title="GitHub Stars"
                                    subtitle={coinDetails?.developer_data?.stars.toString() ?? ''}
                                />
                                <DeveloperCard
                                    title="GitHub Forks"
                                    subtitle={coinDetails?.developer_data?.forks.toString() ?? ''}
                                />
                            </Box>
                        </Box>}
            </Box>
        </>
    );

}

export default CoinDetails;
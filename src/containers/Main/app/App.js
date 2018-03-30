// @flow weak

// #region imports
import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  Header,
  Footer,
    InforFooter,
    ListFooter,
    ItemInforFooter
}                             from '../../../components/index';
import MainRoutes             from '../../../routes/MainRoutes';
// #endregion


class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <Header />
                <MainRoutes/>
                <Footer copyright="© Copyright 2018 Tokubuy, Inc. All Rights Reserved">
                    <InforFooter title={'Get to Know Us'}>
                        <ListFooter>
                            <ItemInforFooter url={"/"}>Careers</ItemInforFooter>
                            <ItemInforFooter url={"/"}>About Tokubuy</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Investor Relations</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Tokubuy Devices</ItemInforFooter>
                        </ListFooter>
                    </InforFooter>

                    <InforFooter title={'Make Money with Us'}>
                        <ListFooter>
                            <ItemInforFooter url={"/"}>Sell on Tokubuy</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Sell Your Services on Tokubuy</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Sell on Tokubuy Business</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Sell Your Apps on Tokubuy</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Become an Affiliate</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Advertise Your Products</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Self-Publish with Us</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Become an Tokubuy Vendor</ItemInforFooter>
                        </ListFooter>
                    </InforFooter>

                    <InforFooter title={'Tokubuy Payment Products'}>
                        <ListFooter>
                            <ItemInforFooter url={"/"}>Tokubuy Rewards Visa Signature Cards</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Tokubuy.com Store Card</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Tokubuy.com Corporate Credit Line</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Shop with Points</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Credit Card Marketplace</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Reload Your Balance</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Self-Publish with Us</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Amazon Currency Converter</ItemInforFooter>
                        </ListFooter>
                    </InforFooter>

                    <InforFooter title={'Let Us Help You'}>
                        <ListFooter>
                            <ItemInforFooter url={"/"}>Your Account</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Your Orders</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Shipping Rates & Policies</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Amazon Prime</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Returns & Replacements</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Manage Your Content and Devices</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Amazon Assistant</ItemInforFooter>
                            <ItemInforFooter url={"/"}>Help</ItemInforFooter>
                        </ListFooter>
                    </InforFooter>
                </Footer>
            </div>
        );
    }

    handlesLogout = async (
        event: SyntheticEvent<>
    ) => {
        if (event) {
            event.preventDefault();
        }
        const {
            actions: {
                disconnectUser,
                errorBadRequest
            },
            history
        } = this.props;
        try {
            disconnectUser();
            history.push('/login');
        } catch (error) {
            errorBadRequest();
            /* eslint-disable no-console */
            console.log('login went wrong..., error: ', error);
            /* eslint-enable no-console */
        }
    };
}

export default App;

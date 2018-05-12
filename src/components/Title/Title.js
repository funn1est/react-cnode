import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Title = ({ title }) => (
  <Helmet>
    <title>{`${title} - CNode 技术社区`}</title>
  </Helmet>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Ellipsis.scss';

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const Ellipsis = ({ text, className, ...restProps }) => {
  const cls = classNames(styles.ellipsis, className, {
    [styles.lines]: !isSupportLineClamp,
    [styles.lineClamp]: isSupportLineClamp,
  });

  const id = `ellipsis-${`${new Date().getTime()}${Math.floor(
    Math.random() * 100,
  )}`}`;

  // support document.body.style.webkitLineClamp
  if (isSupportLineClamp) {
    // because postcss flex: no-2009 can't add -webkit-box-orient css property
    const style = `#${id}{-webkit-line-clamp: 4;-webkit-box-orient: vertical;}`;
    return (
      <div id={id} className={cls} {...restProps}>
        <style>{style}</style>
        {text}
      </div>
    );
  }

  return (
    <div className={cls} {...restProps}>
      {text}
    </div>
  );
};

Ellipsis.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Ellipsis;

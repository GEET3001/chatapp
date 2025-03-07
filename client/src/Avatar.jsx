import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getAvatarColor } from './utils/avatarUtils';

function Avatar({ userId, username, online }) {
  const color = getAvatarColor(userId);

  const avatarClasses = classNames(
    'w-8 h-8 relative rounded-full flex items-center',
    color
  );

  return (
    <div
      className={avatarClasses}
      role="img"
      aria-label={`Avatar of ${username}`}
    >
      <div className="text-center w-full opacity-70">{username[0]}</div>
      <StatusIndicator online={online} />
    </div>
  );
}

function StatusIndicator({ online }) {
  const statusClasses = classNames(
    'absolute w-3 h-3 bottom-0 right-0 rounded-full border border-white',
    {
      'bg-green-400': online,
      'bg-gray-400': !online,
    }
  );

  return <div className={statusClasses} aria-label={online ? 'Online' : 'Offline'} />;
}

Avatar.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  online: PropTypes.bool,
};

Avatar.defaultProps = {
  online: false,
};

export default memo(Avatar);
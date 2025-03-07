import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from './Avatar.jsx';

function Contact({ id, username, onClick, selected, online }) {
  const contactClasses = classNames(
    'border-b border-gray-100 flex items-center gap-2 cursor-pointer',
    { 'bg-blue-50': selected }
  );

  return (
    <div
      onClick={() => onClick(id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(id)}
      role="button"
      tabIndex={0}
      aria-selected={selected}
      className={contactClasses}
    >
      {selected && (
        <div className="w-1 bg-blue-500 h-12 rounded-r-md" aria-hidden="true"></div>
      )}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span className="text-gray-800">{username}</span>
      </div>
    </div>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  online: PropTypes.bool,
};

Contact.defaultProps = {
  selected: false,
  online: false,
};

export default memo(Contact);
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Balloon from '../balloon';
import './user-avatar.scss';

/**
 * 用户头像组件
 */
const UserAvatar = ({ 
    user, 
    size = 'medium', 
    showUserCard = false, 
    userCardRender,
    className,
    prefix = 'fat-',
    ...others 
}) => {
    const [visible, setVisible] = useState(false);

    const sizeMap = {
        small: 24,
        medium: 32,
        large: 40
    };

    const avatarSize = sizeMap[size] || sizeMap.medium;
    const userName = "" + (user.name || "");
    const avatarStyle = { width: avatarSize, height: avatarSize, lineHeight: `${avatarSize}px` };

    const renderAvatar = () => {
        if (user.avatar) {
            return (
                <img 
                    src={user.avatar} 
                    alt={userName}
                    style={avatarStyle}
                    className={`${prefix}comments-avatar-img`}
                />
            );
        }
        
        return (
            <div className={`${prefix}comments-avatar-placeholder`} style={avatarStyle}>
                {userName.charAt(0) || "?"}
            </div>
        );
    };

    const renderUserCard = () => {
        if (userCardRender) {
            return userCardRender(user);
        }

        return (
            <div className={`${prefix}comments-user-card`}>
                <div className={`${prefix}comments-user-card-header`}>
                    <div className={`${prefix}comments-user-card-avatar`}>
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} />
                        ) : (
                            <div className={`${prefix}comments-avatar-placeholder`}>
                                {user.name.charAt(0) || "?"}
                            </div>
                        )}
                    </div>
                    <div className={`${prefix}comments-user-card-info`}>
                        <div className={`${prefix}comments-user-card-name`}>
                            {user.name}
                        </div>
                        {user.title && (
                            <div className={`${prefix}comments-user-card-title`}>
                                {user.title}
                            </div>
                        )}
                    </div>
                </div>
                
                {user.bio && (
                    <div className={`${prefix}comments-user-card-bio`}>
                        {user.bio}
                    </div>
                )}
                
                <div className={`${prefix}comments-user-card-stats`}>
                    {user.commentCount && (
                        <span className={`${prefix}comments-user-card-stat`}>
                            评论 {user.commentCount}
                        </span>
                    )}
                    {user.likeCount && (
                        <span className={`${prefix}comments-user-card-stat`}>
                            获赞 {user.likeCount}
                        </span>
                    )}
                    {user.joinDate && (
                        <span className={`${prefix}comments-user-card-stat`}>
                            加入于 {new Date(user.joinDate).getFullYear()}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    const avatarElement = (
        <div 
            className={cx(`${prefix}comments-avatar`, `${prefix}comments-avatar-${size}`, className)}
            style={avatarStyle}
            {...others}
        >
            {renderAvatar()}
        </div>
    );

    if (!showUserCard) {
        return avatarElement;
    }

    return (
        <Balloon
            trigger={avatarElement}
            triggerType="click"
            visible={visible}
            onVisibleChange={setVisible}
            align="t"
            offset={[0, 8]}
            delay={300}
            className={`${prefix}comments-user-card-balloon`}
        >
            {renderUserCard()}
        </Balloon>
    );
};

UserAvatar.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        title: PropTypes.string,
        bio: PropTypes.string,
        commentCount: PropTypes.number,
        likeCount: PropTypes.number,
        joinDate: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showUserCard: PropTypes.bool,
    userCardRender: PropTypes.func,
    className: PropTypes.string,
    prefix: PropTypes.string
};

/**
 * 自定义比较函数，用于性能优化
 */
const arePropsEqual = (prevProps, nextProps) => {
    const prevUser = prevProps.user;
    const nextUser = nextProps.user;
    
    // ID必须相等
    if (prevUser.id !== nextUser.id) return false;
    
    // 如果有modifiedAt字段，直接比较修改时间
    if (prevUser.modifiedAt && nextUser.modifiedAt) {
        return prevUser.modifiedAt === nextUser.modifiedAt;
    }
    
    // 否则比较用户基本信息
    if (prevUser.name !== nextUser.name) return false;
    if (prevUser.avatar !== nextUser.avatar) return false;
    
    return true;
};

// 使用 React.memo 包装组件
export default memo(UserAvatar, arePropsEqual);
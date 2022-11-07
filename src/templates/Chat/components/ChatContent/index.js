import React, { useEffect, useRef } from 'react';
import { get, map, noop } from 'lodash';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import ChatOffer from 'components/ChatOffer';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { ITEM_TYPE } from 'consts/enums';
import { messagesShape } from './shapes';
import styles from './styles';

const ChatContent = ({
  onAcceptOffer,
  onRejectOffer,
  onOfferLinkClick,
  messages,
  loading,
}) => {
  const endRef = useRef();

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={styles.root}>
      {loading && <Loader />}
      {map(messages, (message) => {
        const isServiceOffer =
          get(message, 'offer.offerType') === ITEM_TYPE.SERVICE;

        let availabilities;

        if (isServiceOffer) {
          availabilities = [
            {
              from: new Date(message.offer.startTime),
              to: new Date(message.offer.endTime),
            },
          ];
        }

        return (
          <Box
            key={message.id}
            sx={{
              ...styles.messageWrapper,
              ...(message.isMyMessage && styles.myMessage),
            }}
          >
            {message.offer ? (
              <ChatOffer
                showButtons={!message.isMyMessage}
                onAccept={() => onAcceptOffer(message.id)}
                onReject={() => onRejectOffer(message.id)}
                onLinkClick={() =>
                  onOfferLinkClick(
                    message.offer.offerType,
                    message.offer.offerId
                  )
                }
                image={require('assets/mockPhoto.jpg')}
                status={message.offer.status}
                animal={message.offer.animal}
                activity={message.offer.activity}
                price={{ from: message.offer.price }}
                availabilities={isServiceOffer ? availabilities : null}
                message={message.content}
              />
            ) : (
              <Message isMyMessage={message.isMyMessage}>
                {message.content}
              </Message>
            )}
          </Box>
        );
      })}
      <Box ref={endRef} />
    </Box>
  );
};

ChatContent.propTypes = {
  messages: messagesShape,
  loading: PropTypes.bool,
  onAcceptOffer: PropTypes.func,
  onRejectOffer: PropTypes.func,
  onOfferLinkClick: PropTypes.func,
};

ChatContent.defaultProps = {
  messages: [],
  loading: true,
  onAcceptOffer: noop,
  onRejectOffer: noop,
  onOfferLinkClick: noop,
};

export default ChatContent;

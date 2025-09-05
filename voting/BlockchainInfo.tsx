import React from 'react';
import { Block } from '../../types';
import Card from '../ui/Card';
import { Shield, Clock, Hash, FileDigit } from 'lucide-react';

interface BlockchainInfoProps {
  block: Block;
}

const BlockchainInfo: React.FC<BlockchainInfoProps> = ({ block }) => {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <Shield className="h-4 w-4 mr-1 text-blue-600" />
          Block #{block.index}
        </h3>
      </div>
      
      <div className="px-4 py-4 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-xs font-medium text-gray-500 flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Timestamp
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(block.timestamp).toLocaleString()}
            </dd>
          </div>
          
          <div className="sm:col-span-1">
            <dt className="text-xs font-medium text-gray-500 flex items-center">
              <FileDigit className="h-3.5 w-3.5 mr-1" />
              Number of Votes
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {block.votes.length}
            </dd>
          </div>
          
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-gray-500 flex items-center">
              <Hash className="h-3.5 w-3.5 mr-1" />
              Hash
            </dt>
            <dd className="mt-1 text-sm font-mono text-gray-900 overflow-hidden text-ellipsis">
              {block.hash}
            </dd>
          </div>
          
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium text-gray-500 flex items-center">
              <Hash className="h-3.5 w-3.5 mr-1" />
              Previous Hash
            </dt>
            <dd className="mt-1 text-sm font-mono text-gray-900 overflow-hidden text-ellipsis">
              {block.previousHash}
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
};

export default BlockchainInfo;
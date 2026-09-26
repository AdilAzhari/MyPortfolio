import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Block, Post } from '../data/posts';
import { profile } from '../data/portfolio';
import { formatDate } from '../utils/date';

// Renders `inline code` spans inside plain text.
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(`[^`]+`)/g).map((part, i) =>
      part.startsWith('`') && part.endsWith('`') ? (
        <code key={i} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[0.85em] text-teal-200">
          {part.slice(1, -1)}
        </code>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    )}
  </>
);

const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case 'h':
      return <h2 className="mb-3 mt-10 text-lg font-semibold text-slate-200">{block.text}</h2>;
    case 'code':
      return (
        <pre className="mb-5 overflow-x-auto rounded-md border border-slate-700/60 bg-slate-950/60 p-4 text-sm leading-relaxed">
          <code className="font-mono text-slate-300">{block.text}</code>
        </pre>
      );
    case 'list':
      return (
        <ul className="mb-5 list-disc space-y-2 pl-5 leading-relaxed">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="mb-5 leading-relaxed">
          <Inline text={block.text} />
        </p>
      );
  }
};

const PostPage: React.FC<{ post: Post }> = ({ post }) => {
  useEffect(() => {
    document.title = `${post.title} · ${profile.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', post.summary);
  }, [post]);

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-12 md:px-12 md:py-20">
      <a href="/#writing" className="group mb-10 inline-flex items-center font-semibold leading-tight text-teal-300">
        <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2 motion-reduce:transition-none" />
        {profile.name}
      </a>

      <article>
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {formatDate(post.date)} · {post.project}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed">{post.summary}</p>
        </header>

        {post.body.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}

        <footer className="mt-12 border-t border-slate-800 pt-6">
          <a
            href={post.pr}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-baseline font-semibold text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
          >
            Read the pull request
            <ArrowUpRight className="ml-1 h-4 w-4 translate-y-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </footer>
      </article>
    </div>
  );
};

export default PostPage;
